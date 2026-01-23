---
title: "Building a Production Selenium Scraper"
date: "2025-01-22"
excerpt: "How I built a robust web scraper that extracts nutrition data from campus dining halls every day, handling crashes, anti-bot detection, and 500+ items."
tags: ["python", "selenium", "web-scraping", "mongodb"]
---

# Building a Production Selenium Scraper

I built CrimsonBites to help students track nutrition at campus dining halls. The core feature is real-time menu data, which meant building a Selenium scraper that runs daily and extracts menu items from a JavaScript-heavy website.

Here's what I learned making it production-ready.

## The Challenge

The dining hall website uses a complex JavaScript framework with:
- Dynamic content loading (React/Vue-style components)
- Modal dialogs for nutrition details
- Multiple dining halls, meals, and stations
- No public API

I needed to:
1. Navigate through halls → meals → stations → items
2. Click nutrition buttons to open modals
3. Extract detailed nutrition data from each modal
4. Handle 500+ items daily without crashing
5. Deal with anti-bot detection

## Lesson 1: The Browser Will Crash. Plan for It.

In my first version, the scraper would run for 10-15 minutes, extract 300 items, then crash with `selenium.common.exceptions.WebDriverException: chrome not reachable`. All progress lost.

**The solution:** Health checks and automatic recovery.

```python
def is_driver_alive(self) -> bool:
    """Check if the browser is still responsive."""
    try:
        self.driver.current_url  # Will fail if window closed
        return True
    except Exception as e:
        self.logger.error(f"Driver is not alive: {e}")
        return False

# Check every 5 items
if row_idx % 5 == 0 and not self.is_driver_alive():
    self.logger.error(f"Driver died during {station_name}")
    break
```

I also built a restart mechanism that cleans up the old driver and spins up a fresh one:

```python
def restart_driver(self) -> bool:
    """Restart the Chrome driver after a crash."""
    try:
        if self.driver:
            self.driver.quit()
    except Exception:
        pass  # Driver might already be dead

    self.driver = self._init_driver()
    self.driver.get(self.target_url)
    return True
```

**Lesson:** Check browser health frequently. Fail fast and recover automatically.

## Lesson 2: Anti-Bot Detection Is Real

The dining hall site started blocking my scraper after a few days. I was getting captchas and the scraper would hang indefinitely.

**The solution:** Make your scraper look human.

### Use Undetected ChromeDriver

```python
import undetected_chromedriver as uc

options = uc.ChromeOptions()
options.add_argument('--disable-blink-features=AutomationControlled')
driver = uc.Chrome(options=options)
```

### Randomize User Agents

```python
from fake_useragent import UserAgent

ua = UserAgent()
user_agent = ua.random
options.add_argument(f'--user-agent={user_agent}')
```

### Remove Automation Signals

```python
def _apply_stealth_features(self, driver):
    """Hide signs that this is an automated browser."""
    driver.execute_script(
        "Object.defineProperty(navigator, 'webdriver', {get: () => false})"
    )
    driver.execute_script(
        "Object.defineProperty(navigator, 'deviceMemory', {get: () => 8})"
    )
    driver.execute_script(
        "Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 4})"
    )
```

### Add Human-Like Delays

```python
def human_wait(self, min_sec=0.1, max_sec=0.5):
    """Simulate human-like waiting times."""
    time.sleep(random.uniform(min_sec, max_sec))

# Use it between actions
self.human_wait()
button.click()
self.human_wait()
```

**Lesson:** Websites actively detect Selenium. You need undetected-chromedriver, random delays, and JavaScript to hide automation signals.

## Lesson 3: Modals Are Nightmare Fuel

Every nutrition button opened a modal. Simple, right? Wrong.

Problems I hit:
- Modals sometimes wouldn't close, blocking the next item
- Backdrop clicks didn't always work
- ESC key didn't always work
- Stale element references after modal closes

**The solution:** A context manager with multiple fallback strategies.

```python
from contextlib import contextmanager

@contextmanager
def modal_context(self, item_name: str):
    """Safely handle modal lifecycle."""
    modal_opened = False
    try:
        yield
        modal_opened = True
    finally:
        if modal_opened:
            self._force_close_modal(item_name)

def _force_close_modal(self, item_name: str):
    """Try every possible way to close a modal."""
    strategies = [
        # Strategy 1: Close button
        lambda: self.driver.find_element(
            By.CSS_SELECTOR, ".modal .close"
        ).click(),

        # Strategy 2: ESC key
        lambda: ActionChains(self.driver).send_keys(Keys.ESCAPE).perform(),

        # Strategy 3: Click backdrop
        lambda: self.driver.find_element(
            By.CSS_SELECTOR, ".modal-backdrop"
        ).click(),

        # Strategy 4: JavaScript force close
        lambda: self.driver.execute_script(
            "document.querySelector('.modal').style.display = 'none';"
        )
    ]

    for strategy in strategies:
        try:
            strategy()
            time.sleep(0.3)  # Wait for close animation
            return
        except Exception:
            continue
```

**Usage:**

```python
with self.modal_context(item_name):
    # Click nutrition button
    nutrition_button.click()

    # Wait for modal
    WebDriverWait(self.driver, 2).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".modal-body"))
    )

    # Extract data
    nutrition_data = self._extract_modal_data()

    # Modal automatically closes on exit, even if extraction fails
```

**Lesson:** Modals can fail to close. Use a context manager to guarantee cleanup, and have multiple fallback strategies.

## Lesson 4: Clicks Don't Always Work

Sometimes `element.click()` just... doesn't work. The button exists, it's visible, but nothing happens.

**The solution:** Fallback click strategies.

```python
def safe_click(self, element, element_name="element") -> bool:
    """Try multiple ways to click an element."""
    strategies = [
        # Strategy 1: Normal click
        lambda: element.click(),

        # Strategy 2: Action chains (moves mouse, then clicks)
        lambda: ActionChains(self.driver).move_to_element(element).click().perform(),

        # Strategy 3: JavaScript click
        lambda: self.driver.execute_script("arguments[0].click();", element),

        # Strategy 4: JavaScript event dispatch
        lambda: self.driver.execute_script(
            "arguments[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));",
            element
        )
    ]

    for i, strategy in enumerate(strategies):
        try:
            strategy()
            self.logger.debug(f"Clicked {element_name} using strategy {i+1}")
            return True
        except Exception as e:
            if i == len(strategies) - 1:
                self.logger.error(f"All click strategies failed for {element_name}: {e}")
                return False

    return False
```

JavaScript click works when the normal click fails because of:
- Overlapping elements
- CSS animations
- Z-index issues
- Event listeners that prevent default behavior

**Lesson:** Have multiple click strategies. JavaScript click is your friend.

## Lesson 5: Save Progress Checkpoints

When your scraper crashes on item 487 of 500, you don't want to start over.

**The solution:** Save progress after each dining hall.

```python
def _save_progress_checkpoint(self, data: dict, hall_number: int):
    """Save intermediate results."""
    checkpoint_file = f"progress_after_{hall_number}_halls.json"

    checkpoint_data = {
        "timestamp": datetime.now().isoformat(),
        "halls_completed": hall_number,
        "total_items": sum(
            len(station["items"])
            for hall in data["dining_halls"]
            for meal in hall["meals"]
            for station in meal["stations"]
        ),
        "data": data
    }

    with open(checkpoint_file, 'w') as f:
        json.dump(checkpoint_data, f, indent=2)

    self.logger.info(f"Saved checkpoint: {checkpoint_file}")
```

If the scraper crashes, I can resume from the last completed hall instead of starting over.

**Lesson:** Scraping is fragile. Save progress frequently so you don't lose hours of work.

## Lesson 6: Track Failed Items

Some items just won't scrape. Maybe the modal is broken, maybe the nutrition button is missing, maybe the data is malformed.

**The solution:** Track failures and skip retrying known bad items.

```python
def __init__(self):
    self.failed_items = set()  # Track items that failed

def _extract_item_from_row(self, row):
    """Extract nutrition data from a menu item row."""
    item_name = row.find_element(By.CSS_SELECTOR, ".item-name").text

    # Skip if we already know this item fails
    if item_name in self.failed_items:
        self.logger.debug(f"Skipping {item_name} - previously failed")
        return None

    try:
        # ... extraction logic ...
        return item_data
    except Exception as e:
        self.logger.error(f"Failed to extract {item_name}: {e}")
        self.failed_items.add(item_name)
        return None
```

This prevents the scraper from wasting time retrying items that are known to fail.

**Lesson:** Some data will always fail. Track failures and move on instead of getting stuck.

## Lesson 7: Batch MongoDB Inserts

Inserting 500+ items one at a time is slow. Each insert is a round trip to the database.

**The solution:** Batch inserts.

```python
def upload_to_mongodb(self, foods: list) -> bool:
    """Upload all items to MongoDB in batches."""
    collection = self.db["foods"]

    # Clear today's data
    today = datetime.now().strftime("%Y-%m-%d")
    collection.delete_many({"date": today})

    # Insert in batches of 100
    batch_size = 100
    for i in range(0, len(foods), batch_size):
        batch = foods[i:i + batch_size]
        collection.insert_many(batch)
        self.logger.info(f"Inserted batch {i//batch_size + 1}")

    return True
```

This reduced upload time from ~2 minutes to ~5 seconds.

**Lesson:** Batch database operations. Single inserts don't scale.

## Lesson 8: Incremental Scraping Saves Time

Dining halls don't post all meals at once. Breakfast appears at 7 AM, lunch at 11 AM, dinner at 5 PM. I wanted fresh data, so I ran the scraper multiple times per day.

The problem? My initial scraper re-scraped everything every run. If I had already scraped breakfast and lunch, running again at 1 PM would scrape those same meals again, wasting 10-15 minutes.

**The solution:** Check what meals are already in the database, then only scrape missing ones.

```python
def scrape_incremental(self):
    """Only scrape meals not already in the database."""
    # Check what we already have for today
    existing = self.get_existing_meals_for_today()  # Returns {hall: {meal1, meal2}}

    for hall in self.get_dining_halls():
        for meal in self.get_meals(hall):
            # Skip if we already scraped this meal
            if hall in existing and meal in existing[hall]:
                continue

            # Scrape only new meals
            self.scrape_meal(hall, meal)
```

Now when I run at 1 PM, it skips breakfast and lunch (already scraped at 8 AM and noon) and only gets dinner when it's posted. A full scrape takes 15-20 minutes. Incremental runs take 2-3 minutes.

**Lesson:** Query existing data before scraping. Only fetch what you don't have.

## The Final Architecture

Here's the complete flow:

1. **Initialize** with anti-bot measures (undetected-chromedriver, random user agent, stealth scripts)
2. **Health checks** every 5 items to catch crashes early
3. **Navigate** through halls → meals → stations → items
4. **Click** nutrition buttons using fallback strategies
5. **Extract** data from modals with guaranteed cleanup
6. **Track** failed items to avoid wasting time
7. **Save** checkpoints after each hall
8. **Batch insert** to MongoDB for performance
9. **Incremental mode** to only scrape missing meals

## Key Metrics

- **500+ items** scraped daily
- **3-5 dining halls** per run
- **15-20 minutes** total runtime
- **~95% success rate** (some items legitimately missing data)
- **Zero manual intervention** since deploying these fixes

## Tools I Used

- **Python 3.11** - Main language
- **Selenium 4.x** - Browser automation
- **undetected-chromedriver** - Anti-bot bypass
- **fake-useragent** - Random user agents
- **MongoDB** - Data storage with batch inserts
- **Chrome headless** - No GUI needed for production

## Final Thoughts

Web scraping is fragile by nature. Websites change, browsers crash, and anti-bot systems improve. The key is building systems that expect failure and handle it gracefully.

**Don't aim for perfect scraping.** Aim for robust scraping that:
- Recovers from crashes automatically
- Saves progress frequently
- Handles missing data gracefully
- Skips known failures
- Looks human enough to avoid bans

If you're building a production scraper, invest in error handling from day one. It's not glamorous, but it's the difference between a scraper that works once and a scraper that works for months.

The code for CrimsonBites is open source on [GitHub](https://github.com/koensakamoto/CrimsonBites). The scraper implementation is in `/backend/menu_scraper.py` if you want to see the full details.

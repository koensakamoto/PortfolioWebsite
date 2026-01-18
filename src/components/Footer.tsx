export function Footer() {
  return (
    <footer className="py-8 border-t-2 border-border">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Koen Sakamoto</p>
        <a
          href="#"
          className="hover:text-foreground transition-colors"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-portal-border bg-portal-dark py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600">
        <p>
          Built with the{" "}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portal-teal hover:underline"
          >
            Rick and Morty API
          </a>{" "}
          · Data belongs to Adult Swim
        </p>
      </div>
    </footer>
  );
}

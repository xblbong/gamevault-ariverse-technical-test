export const Footer = () => {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-8 mt-auto">
      <div className="container-page">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-heading-md font-bold tracking-tight">
              GAME<span className="text-primary-500">VAULT</span>
            </span>
            <p className="text-body-sm text-text-muted">
              © {new Date().getFullYear()} Ariverse Studio. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-label-sm text-text-secondary">
            <span className="hover:text-primary-500 transition-colors cursor-pointer uppercase">Privacy Policy</span>
            <span className="hover:text-primary-500 transition-colors cursor-pointer uppercase">Terms of Service</span>
            <span className="hover:text-primary-500 transition-colors cursor-pointer uppercase">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
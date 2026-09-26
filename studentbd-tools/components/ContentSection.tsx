export function ContentSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-20">
      <h2 className="font-display text-xl font-semibold text-navy-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-navy-600 dark:text-navy-300 sm:text-base">
        {children}
      </div>
    </section>
  );
}

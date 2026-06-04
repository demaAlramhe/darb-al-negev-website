"use client";

import { galleryItems } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function Gallery() {
  const { locale, t } = useLanguage();

  return (
    <section id="gallery" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.gallery.label}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <AnimateIn
              key={item.id}
              delay={index * 0.05}
              className={`${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} transition-transform hover:scale-[1.02] ${
                  index === 0 ? "min-h-[280px] md:min-h-[360px]" : "min-h-[160px] sm:min-h-[180px]"
                } h-full`}
              >
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/15" />
                <div className="absolute start-4 top-4 text-3xl sm:text-4xl">{item.icon}</div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-semibold text-white sm:text-base">{item.label[locale]}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

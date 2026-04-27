import { useI18n } from "@/i18n/I18nProvider";
import type { Lang } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGS: Lang[] = ["en", "my"];

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className="inline-flex rounded-full border bg-muted/80 p-1"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <Button
          key={l}
          type="button"
          variant={lang === l ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-9 rounded-full px-3 text-xs",
            l === "my" && lang === "my" && "font-myanmar",
          )}
          onClick={() => setLang(l)}
        >
          {t(`lang.${l}`)}
        </Button>
      ))}
    </div>
  );
}

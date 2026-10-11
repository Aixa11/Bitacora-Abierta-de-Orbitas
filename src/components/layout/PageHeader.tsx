import type { MessageKey } from '../../i18n/translate';
import { useI18n } from '../../i18n/useI18n';
import { ContentLocaleNotice } from './ContentLocaleNotice';

type PageHeaderProps = {
  titleKey: MessageKey;
  leadKey: MessageKey;
  /** Muestra aviso de contenido seed aún en español. */
  showContentNotice?: boolean;
};

export function PageHeader({ titleKey, leadKey, showContentNotice = true }: PageHeaderProps) {
  const { t } = useI18n();

  return (
    <header className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t(titleKey)}</h1>
        <p className="mt-3 max-w-prose text-lg text-[color:var(--orbit-muted)]">{t(leadKey)}</p>
      </div>
      {showContentNotice ? <ContentLocaleNotice /> : null}
    </header>
  );
}

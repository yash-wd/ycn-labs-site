export type ShowroomMode =
  | 'website'
  | 'webapp'
  | 'automation'
  | 'crm'
  | 'store'
  | 'learning';

export interface ShowroomModeMeta {
  id: ShowroomMode;
  label: string;
  caption: string;
  stageLabel: string;
  icon: 'Globe' | 'Smartphone' | 'Workflow' | 'LayoutDashboard' | 'ShoppingBag' | 'GraduationCap';
}

export const SHOWROOM_MODES: ShowroomModeMeta[] = [
  {
    id: 'website',
    label: 'Websites',
    caption: 'A clear website that shows what you do and makes it easy to ask for a visit.',
    stageLabel: 'Example: Websites',
    icon: 'Globe',
  },
  {
    id: 'webapp',
    label: 'Web apps',
    caption: 'Customers can ask for a job online and give a preferred day and time, without a phone call.',
    stageLabel: 'Example: Web apps',
    icon: 'Smartphone',
  },
  {
    id: 'automation',
    label: 'Automation',
    caption: 'Routine follow-ups can run on their own, so fewer of them rely on memory.',
    stageLabel: 'Example: Automation',
    icon: 'Workflow',
  },
  {
    id: 'crm',
    label: 'CRM & admin',
    caption: 'One screen for requests, jobs and customers, so you can see what is still open.',
    stageLabel: 'Example: CRM & admin',
    icon: 'LayoutDashboard',
  },
  {
    id: 'store',
    label: 'Online store',
    caption: 'Customers can browse products, fill a cart and place an order online.',
    stageLabel: 'Example: Online store',
    icon: 'ShoppingBag',
  },
  {
    id: 'learning',
    label: 'Learning platform',
    caption: 'Students can follow lessons at their own pace and see their progress.',
    stageLabel: 'Example: Learning platform',
    icon: 'GraduationCap',
  },
];

export const SHOWROOM_DISCLOSURE =
  'Examples only. Example Home Repairs, Example Home Supplies, Example Learning Hub and the example shop shown above are not real businesses or clients. Nothing you do here is submitted, bought or sent.';

export const SELECTOR_GROUP_LABEL = 'Choose an example';

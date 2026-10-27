// The Givebutter library script is loaded in index.html. This renders the
// widget it defines; the id comes from the widget's embed code.
const GIVEBUTTER_WIDGET_ID = "LPkWvy";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "givebutter-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function GivebutterWidget() {
  return <givebutter-widget id={GIVEBUTTER_WIDGET_ID} />;
}

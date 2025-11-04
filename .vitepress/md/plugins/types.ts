export interface DelimiterRule {
  delimiter: string;
  tokenName: string;
  tag: string;
  attrs?: Record<string, string>;
}

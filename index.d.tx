declare module "regular-elements" {
  export interface RegularElementAttributeChangeEvent extends Event {
    attributeName: string;
    oldValue: string;
    newValue: string;
  }

  interface regularElementsOptions {
    onconnected?(): void;
    ondisconnected?(): void;
    onattributechanged?(event: RegularElementAttributeChangeEvent): void;
    attributeFilter?: string[];
  }

  const regularElements: {
    define(selector: string, options: regularElementsOptions): void;
    get(selector: string): regularElementsOptions;
    whenDefined(selector: string): Promise<regularElementsOptions>;
  };
  export default regularElements;
}

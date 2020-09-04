export {};

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

declare module '*.png';
declare module '*.svg';

import { Interpolation } from '@emotion/core';

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: Interpolation<unknown>;
    }
}

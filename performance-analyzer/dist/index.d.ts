export * from './main/src/v5';
import v1 from './main/src/v1';
import v2 from './main/src/v2';
import v3 from './main/src/v3';
import v4 from './main/src/v4';
export declare const versions: {
    v1: typeof v1;
    v2: typeof v2;
    v3: typeof v3;
    v4: typeof v4;
    v5: typeof DecoratorWrapper.getTotalPossibleConfigurations;
};

export const loadComponent = (scope: string, module: string) => {
    return async () => {
        await __webpack_init_sharing__('default');
        const container = window[scope];

        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();

        return Module;
    };
};

export default store =>
    (nextState, replace) => {
        const { user: { authenticated } } = store.getState();

        if (!authenticated) {
            replace({
                pathname: '/auth/signin',
                state: { nextPathname: nextState.location.pathname },
            });
        }
    };

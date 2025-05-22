import('./pkg/yewchat.js').then((module) => {
    module.run_app();
}).catch(e => console.error("Error importing from ./pkg/yewchat.js:", e));

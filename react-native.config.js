module.exports = {
    assests: ["./src/assets/fonts/"],
    getTransformModulePath(){
        return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts(){
        return ['ts', 'tsx'];
    },
};
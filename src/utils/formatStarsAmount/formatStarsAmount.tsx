export const formatStarsAmount = (starsAmount: number): string => {
    if (starsAmount >= 1000 && starsAmount < 1000000) {
        return (starsAmount / 1000).toFixed() + "K";
    }
    if (starsAmount >= 1000000) {
        return (starsAmount / 1000000).toFixed() + "M";
    }
    return starsAmount.toString();
};

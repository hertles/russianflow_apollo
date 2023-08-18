export const calculatePolylineDistance = (latLngs) => {
    let distance = 0

    for (let i = 1; i < latLngs.length; i++) {
        distance += latLngs[i - 1].distanceTo(latLngs[i])
    }

    return distance
};

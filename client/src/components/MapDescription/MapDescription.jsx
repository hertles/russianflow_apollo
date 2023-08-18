import React from 'react';
import NewPointForm from "./NewPointForm/NewPointForm";
import PointDescription from "./PointDescription/PointDescription";
import RouteDescription from "./RouteDescription/RouteDescription";
import NewPathForm from "./NewPathForm/NewPathForm";
import PathDescription from "./PathDescription/PathDescription";

function MapDescription({addingPointMode, newPoint, addingPathMode, pointId, pathId, route, newPath}) {
    if (addingPointMode) {
        return <NewPointForm newPoint={newPoint}/>;
    }
    if (addingPathMode) {
        return <NewPathForm newPath={newPath}/>;
    }
    if (pointId !== null) {
        return <PointDescription/>;
    }
    if (pathId !== null) {
        return <PathDescription/>;
    }
    return <RouteDescription route={route}/>;
}

export default MapDescription;

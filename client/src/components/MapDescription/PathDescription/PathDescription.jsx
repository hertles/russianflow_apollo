import React, {useEffect, useState} from 'react';
import style from './PathDescription.module.scss'
import {useMutation, useQuery} from "@apollo/client";
import {useSearchParams} from "react-router-dom";
import Button from "../../common/Button/Button";
import {GET_PATH} from "../../../graphql/getPath";
import {pathsVar} from "../../../store";
import {DELETE_PATH} from "../../../graphql/deletePath";

const PathDescription = () => {
    const [search, setSearch] = useSearchParams()
    const pathId = search.get('path')
    const [path, setPath] = useState({})
    const {data, loading} = useQuery(GET_PATH, {variables: {id: pathId}})
    const [deletePath] = useMutation(DELETE_PATH)
    const deleteCurrentPath = async () => {
        await deletePath({
            variables: {
                id: pathId
            }
        })
        setSearch({})
        pathsVar([...pathsVar().filter(path=>path.id!==pathId)])
    }
    useEffect(() => {
        if (data && !loading) {
            setPath(data.path)
        }
    }, [data, loading, pathId])
    if (loading) {
        return <div className={"toCenter"}>Загрузка...</div>
    }
    if (path?.desc) {
        return (
            <div className={style.pathDescription}>
                <div className={style.name}>Путь</div>
                <div className={style.info}>
                    <div><strong>Описание: </strong>{path.desc}</div>
                    <div><strong>Расстояние: </strong>{(path.distance/1000).toFixed(2)} км</div>
                </div>
                <div className={style.buttons}>
                    <Button onClick={deleteCurrentPath} type={"button"} title={"Удалить путь"}/>
                </div>
            </div>
        );
    }
    return (
        <div className={"toCenter"}>Путь не существует</div>
    );

}

export default PathDescription;

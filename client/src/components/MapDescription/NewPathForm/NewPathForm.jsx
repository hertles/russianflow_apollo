import React from 'react';
import style from './NewPathForm.module.scss'
import {Field, Form} from "react-final-form";
import {Textarea} from "../../common/Textarea/Textarea";
import Button from "../../common/Button/Button";
import {useMutation} from "@apollo/client";
import {CREATE_PATH} from "../../../graphql/createPath";
import {useParams, useSearchParams} from "react-router-dom";
import {pathsVar} from "../../../store";

function NewPathForm({newPath}) {
    const {id} = useParams()
    const [addPath, { loading }] = useMutation(CREATE_PATH)
    const setSearch = useSearchParams()[1]
    const onSubmit = async values => {
        const {pathDesc} = values
        const result = await addPath({
            variables: {
                data: {
                    route: {connect: {id}},
                    desc: pathDesc,
                    nodes: {create: [...newPath.nodes]},
                    distance: newPath.distance
                }
            }
        })
        pathsVar([...pathsVar(),result.data.createPath])
        setSearch({path: result.data.createPath.id})
    }

    return (
        <div className={style.NewPathForm}>
            <div className={style.Name}>{newPath.name ? newPath.name : "Новый путь"}</div>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    pathDesc: newPath.desc,
                }}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="pathDesc">
                                {props => (
                                    <div>
                                        <Textarea
                                            disabled={loading}
                                            placeholder={"Описание пути"}
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={props.input.onChange}
                                        />
                                    </div>
                                )}
                            </Field>
                        </div>
                        <Button disabled={loading} type="submit" title="Создать"/>
                        {loading && <div className={style.loading}>Загрузка...</div>}
                    </form>
                )}
            />
        </div>
    );
}

export default NewPathForm;

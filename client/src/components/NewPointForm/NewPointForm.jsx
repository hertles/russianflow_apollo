import React from 'react';
import style from './NewPointForm.module.scss'
import {Input} from "../common/Input/Input";
import {Form, Field, FormSpy,} from 'react-final-form'
import SubmitButton from "../common/SubmitButton/SubmitButton";
import {Textarea} from "../common/Textarea/Textarea";
import {Select} from "../common/Select/Select";
import {pointTypes} from "../../utils/pointTitles";
import {newPointVar, pointsVar} from "../../store";
import {useMutation, useReactiveVar} from "@apollo/client";
import {Dropzone} from "../common/Dropzone/Dropzone";
import {ADD_POINT} from "../../graphql/addPoint";
import {useParams, useSearchParams} from "react-router-dom";
import axios from "axios";

const NewPointForm = ({location}) => {
    const newPoint = useReactiveVar(newPointVar)

    const x = Number(location.lat)
    const y = Number(location.lng)
    const locationIsSet = location.lat * location.lng !== 0

    const [addPoint] = useMutation(ADD_POINT)

    const {id} = useParams()
    const setSearch = useSearchParams()[1]

    const onSubmit = async (values) => {
        console.log(values)
        const photo = [...values.pointPhoto][0]
        const formData = new FormData();
        formData.append("image", photo);
        Promise.all([
            addPoint({
                variables: {
                    point: {
                        routeId: Number(id),
                        name: values.pointName,
                        desc: values.pointDesc,
                        type: values.pointType,
                        x,
                        y
                    }
                }
            }),
            axios.post('http://localhost:5000/route/0/point/6/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        ]).then(([res, photoRes]) => {
            console.log(photoRes)
            setSearch({point: res.data.addPoint.id})
            pointsVar([...pointsVar(), res.data.addPoint])
        })
    }

    return (
        <div className={style.NewPointForm}>
            <div className={style.Name}>{newPoint.name ? newPoint.name : "Новая точка"}</div>
            {locationIsSet
                ? <div>
                    <div><strong>x: </strong>{x}</div>
                    <div><strong>y: </strong>{y}</div>

                    <Form
                        onSubmit={onSubmit}
                        initialValues={{
                            pointName: newPoint.name,
                            pointDesc: newPoint.desc,
                            pointType: newPoint.type
                        }}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <FormSpy
                                    subscription={{values: true, modified: true}}
                                    onChange={props => {
                                        if (props.modified) {
                                            newPointVar({
                                                ...newPointVar(),
                                                name: props.values.pointName,
                                                desc: props.values.pointDesc,
                                                type: props.values.pointType
                                            })
                                        }
                                    }}
                                />
                                <div>
                                    <Field
                                        name={"pointPhoto"}
                                        component={"input"}
                                        type="file"
                                    >
                                        {props => <Dropzone {...props.input} value={props.input.value}
                                                            onChange={props.input.onChange} photo={null}/>}
                                    </Field>
                                    <Field name="pointName">
                                        {props => (
                                            <div>
                                                <Input
                                                    placeholder={"Название"}
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="pointDesc">
                                        {props => (
                                            <div>
                                                <Textarea
                                                    placeholder={"Описание"}
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="pointType">
                                        {props => (
                                            <div>
                                                <Select
                                                    options={pointTypes}
                                                    placeholder={"Тип точки на карте"}
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <SubmitButton title="Создать"/>
                            </form>
                        )}
                    />
                </div>
                : <div>
                    Выберите место для новой точки
                </div>}
        </div>
    );


}

export default NewPointForm;

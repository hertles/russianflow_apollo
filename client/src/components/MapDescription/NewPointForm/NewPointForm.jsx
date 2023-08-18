import React from 'react';
import style from './NewPointForm.module.scss'
import {Input} from "../../common/Input/Input";
import {Form, Field, FormSpy,} from 'react-final-form'
import Button from "../../common/Button/Button";
import {Textarea} from "../../common/Textarea/Textarea";
import {Select} from "../../common/Select/Select";
import {newPointVar, newPointVarInitial, pointsVar} from "../../../store";
import {useMutation, useQuery} from "@apollo/client";
import {Dropzone} from "../../common/Dropzone/Dropzone";
import {CREATE_POINT} from "../../../graphql/createPoint";
import {useParams, useSearchParams} from "react-router-dom";
import {GET_ALL_CATEGORIES} from "../../../graphql/getAllCategories";


const NewPointForm = ({newPoint}) => {
    const x = Number(newPoint.lat)
    const y = Number(newPoint.lng)
    const locationIsSet = newPoint.lat * newPoint.lng !== 0

    const [addPoint] = useMutation(CREATE_POINT)
    const {id} = useParams()
    const setSearch = useSearchParams()[1]

    const {data, loading} = useQuery(GET_ALL_CATEGORIES)

    const onSubmit = async (values) => {
        const image = values.pointImage ? {upload: [...values.pointImage][0]} : null
        const result = await addPoint({
            variables: {
                data: {
                    route: {connect: {id}},
                    name: values.pointName,
                    desc: values.pointDesc,
                    category: {connect: {id: data.categories.find(cat => cat.name === values.pointCategory).id}},
                    x,
                    y,
                    image: image
                }
            }
        })
        newPointVar(newPointVarInitial)
        setSearch({point: result.data.createPoint.id})
        pointsVar([...pointsVar(), result.data.createPoint])

    }

    const formChangeHandler = props => {
        if (props.modified && data.categories.length > 0) {
            newPointVar({
                ...newPointVar(),
                name: props.values.pointName,
                desc: props.values.pointDesc,
                category: data.categories.find(cat => cat.name === props.values.pointCategory),
                image: props.values.pointImage
            })
        }
    }

    return (
        <div className={style.NewPointForm}>
            <div className={style.Name}>{newPoint.name ? newPoint.name : "Новая точка"}</div>
            {locationIsSet && !loading
                ? <div>
                    <div><strong>x: </strong>{x}</div>
                    <div><strong>y: </strong>{y}</div>

                    <Form
                        onSubmit={onSubmit}
                        initialValues={{
                            pointName: newPoint.name,
                            pointDesc: newPoint.desc,
                            pointCategory: newPoint.category.name,
                            pointImage: newPoint.image
                        }}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <FormSpy
                                    subscription={{values: true, modified: true}}
                                    onChange={formChangeHandler}
                                />
                                <div>
                                    <Field
                                        name={"pointImage"}
                                        component={"input"}
                                        type="file"
                                    >
                                        {props => <Dropzone {...props.input} value={props.input.value}
                                                            onChange={props.input.onChange} photo={props.input.value}/>}
                                    </Field>
                                    <Field name="pointName">
                                        {props => (
                                            <div>
                                                <Input
                                                    placeholder={"Название точки"}
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
                                                    placeholder={"Описание точки"}
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="pointCategory">
                                        {props => (
                                            <div>
                                                <Select
                                                    options={data.categories.map(cat => cat.name)}
                                                    viewOption={'name'}
                                                    placeholder={"Тип точки на карте"}
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <Button type="submit" title="Создать"/>
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

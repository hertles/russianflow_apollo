import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import imagePlaceholder from "../../../assets/images/image-placeholder.png"
import style from './Dropzone.module.scss'

export const Dropzone = props => {
    const [files, setFiles] = useState()
    const [photo, setPhoto] = useState(imagePlaceholder)
    const {getRootProps, getInputProps} = useDropzone({
            ...props.input,
            accept: "image/*",
            multiple: false,
            noDrag: true,
            onDrop: (acceptedFiles) => {
                const files = [...acceptedFiles]
                setFiles(files);
                if (props.onChange) {
                    props.onChange(files);
                }
            }
        }
    );
    useEffect(() => {
        if (files) {
            if (files.length === 1 && !files[0].type.includes('gif')) {
                setPhoto(URL.createObjectURL(files[0]))
            }
        } else if (props.photo) {
            setPhoto(URL.createObjectURL(props.photo[0]))
        }
    }, [files, props.photo])
    return <div {...getRootProps({className: 'dropzone'})}>
        <div className={style.photoContainer}>
            <img
                className={style.photo}
                src={photo}
                alt="Фотография места"
            />
            <input
                className={style.choosePhotoInput}
                id={"choosePhotoInput"}
                {...getInputProps()}
            />
            <span className={style.choosePhotoSpan}>
                Выбрать фото
            </span>
        </div>
    </div>
}

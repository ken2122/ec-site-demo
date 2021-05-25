import styles from '../../assets/styles/style.module.css';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import { useCallback } from 'react';
import { ImagePreview } from './index';
import { storage } from '../../firebase/index';
import { ImageAreaProps } from '../../../types/index';

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48,
    },
});

const ImageArea = (props: ImageAreaProps): JSX.Element => {
    const classes = useStyles();

    const uploadImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files[0];
            const fileInBlob = [file];

            const blob = new Blob(fileInBlob, { type: 'image/jpeg' });

            // Generate random 16 digits strings
            const S =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const N = 16;
            const fileName = Array.from(
                crypto.getRandomValues(new Uint32Array(N))
            )
                .map((n) => S[n % S.length])
                .join('');

            const uploadRef = storage.ref('images').child(fileName);
            const uploadTask = uploadRef.put(blob);

            uploadTask.then(() => {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((downloadURL: string) => {
                        const newImage = { id: fileName, path: downloadURL };
                        props.setImages((prevState) => [
                            ...prevState,
                            newImage,
                        ]);
                    });
            });
        },
        [props.setImages]
    );

    const deleteImage = useCallback(
        async (id: string) => {
            const ret = window.confirm('この画像を削除しますか？');
            if (!ret) {
                return false;
            } else {
                const newImages = props.images.filter(
                    (image) => image.id !== id
                );
                props.setImages(newImages);
                return storage.ref('images').child(id).delete();
            }
        },
        [props.images]
    );

    return (
        <div>
            <div className={styles.pGridListImages}>
                {props.images.length > 0 &&
                    props.images.map((image) => (
                        <ImagePreview
                            delete={deleteImage}
                            id={image.id}
                            path={image.path}
                            key={image.id}
                        />
                    ))}
            </div>
            <div className={styles.uTextRight}>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input
                            className={styles.uDisplayNone}
                            type="file"
                            id="image"
                            onChange={(e) => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    );
};

export default ImageArea;

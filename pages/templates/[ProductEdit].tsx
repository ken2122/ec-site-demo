import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useState, useCallback, useEffect } from 'react';
import styles from '../../src/assets/styles/style.module.css';
import {
    TextInput,
    SelectBox,
    PrimaryButton,
} from '../../src/components/UIkit/index';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../../src/redux/products/operations';
import { ImageArea, SetSizesArea } from '../../src/components/products/index';
import {
    fetchDbProduct,
    fetchDbCategories,
    fetchProductsId,
} from '../../src/firebase/index';
import { PageProps, Product, List, Image, Size } from '../../types/index';

interface Params extends ParsedUrlQuery {
    ProductEdit: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({
    params,
}) => {
    let product: Product;
    const id = params.ProductEdit;

    if (id !== 'ProductEdit') {
        product = await fetchDbProduct(id);
    } else {
        product = {
            id: id,
            category: '',
            created_at: '',
            description: '',
            gender: '',
            images: [],
            name: '',
            price: null,
            sizes: [],
            updated_at: '',
        };
    }

    const list: List[] = await fetchDbCategories();
    return {
        props: {
            product,
            list,
        },
        revalidate: 1,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const id = await fetchProductsId();
    id.push('ProductEdit');
    const paths = id.map((pathName) => {
        return {
            params: {
                ProductEdit: pathName,
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
};

const ProductEdit = ({ product, list }: PageProps): JSX.Element => {
    const dispatch = useDispatch();
    const id = product.id;
    const genders = [
        { id: 'all', name: '全て' },
        { id: 'male', name: 'メンズ' },
        { id: 'female', name: 'レディース' },
    ];

    const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [images, setImages] = useState<Image[]>([]),
        [gender, setGender] = useState(''),
        [price, setPrice] = useState<number>(null),
        [sizes, setSizes] = useState<Size[]>([]);

    const inputName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        },
        [setName]
    );

    const inputDescription = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
        },
        [setDescription]
    );

    const inputPrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPrice(Number(event.target.value));
        },
        [setPrice]
    );

    useEffect(() => {
        setImages(product.images);
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setGender(product.gender);
        setPrice(product.price);
        setSizes(product.sizes);
    }, [id]);

    return (
        <section>
            <h2 className={`${styles.uTextHeadline} ${styles.uTextCenter}`}>
                商品の登録・編集
            </h2>
            <div className={styles.cSectionContainer}>
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true}
                    label={'商品名'}
                    multiline={false}
                    required={true}
                    rows={1}
                    value={name}
                    type={'text'}
                    onChange={inputName}
                />
                <TextInput
                    fullWidth={true}
                    label={'商品説明'}
                    multiline={true}
                    required={true}
                    rows={5}
                    value={description}
                    type={'text'}
                    onChange={inputDescription}
                />
                <SelectBox
                    label={'カテゴリー'}
                    required={true}
                    value={category}
                    select={setCategory}
                    options={list}
                />
                <SelectBox
                    label={'性別'}
                    required={true}
                    value={gender}
                    select={setGender}
                    options={genders}
                />
                <TextInput
                    fullWidth={true}
                    label={'価格'}
                    multiline={false}
                    required={true}
                    rows={1}
                    value={price}
                    type={'number'}
                    onChange={inputPrice}
                />
                <div className={styles.moduleSpacerSmall} />
                <SetSizesArea sizes={sizes} setSizes={setSizes} />
                <div className={styles.moduleSpacerSmall} />
                <div className={styles.center}>
                    <PrimaryButton
                        label={'商品情報を登録'}
                        clickEvent={() =>
                            dispatch(
                                saveProduct(
                                    id,
                                    name,
                                    description,
                                    category,
                                    gender,
                                    price,
                                    images,
                                    sizes
                                )
                            )
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductEdit;

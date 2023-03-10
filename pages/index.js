import { useContext } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Hero from "@/components/Home/Hero";
import InfoBlock from "@/components/Home/InfoBlock";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import LatestProducts from "@/components/Home/LatestProducts";
import YouTubeLink from "@/components/Home/YouTubeLink";
import Categories from "@/components/Home/Categories";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

const HomeScreen = ({ categories, featuredProducts, latestProducts }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {
      data: { data },
    } = await axios.get(
      `http://localhost:7000/api/v1/public/get_single_product?productId=${product._id}`
    );

    if (data.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    } else {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity: quantity },
      });
      toast.success("Product added to the cart");
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Home">
        <Hero />
        <InfoBlock />
        <FeaturedProducts
          products={featuredProducts}
          addToCartHandler={addToCartHandler}
        />
        <LatestProducts
          products={latestProducts}
          addToCartHandler={addToCartHandler}
        />
        <YouTubeLink />
        <Categories categories={categories} />
      </Layout>
    </>
  );
};

const getServerSideProps = async () => {
  const latestProductsRes = await fetch(
    "http://localhost:7000/api/v1/public/get_all_products"
  );
  const latestProductsData = await latestProductsRes.json();

  const featuredProductsRes = await fetch(
    "http://localhost:7000/api/v1/public/get_featured_products"
  );
  const featuredProductsData = await featuredProductsRes.json();

  const categoriesRes = await fetch(
    "http://localhost:7000/api/v1/public/get_categories"
  );
  const categoriesData = await categoriesRes.json();

  return {
    props: {
      latestProducts: latestProductsData,
      featuredProducts: featuredProductsData,
      categories: categoriesData,
    },
  };
};

export { getServerSideProps };
export default HomeScreen;

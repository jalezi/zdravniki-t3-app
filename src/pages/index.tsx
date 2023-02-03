import { type NextPage } from 'next';
import Link from 'next/link';
import { Seo } from '../components/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <main>
        <h1>h1</h1>
        <button>button</button>
        <br />
        <Link href="#">dummy link</Link>
      </main>
    </>
  );
};

export default Home;

import Image from "next/image";
import img from '../../public/images/category.png'

const CategoryCard = () => {
  return (
    <div className="p-3 m-2 max-w-[400px] border bg-[#eeeeee] rounded-xl">
      <div className="pb-2 border-b-2 border-b-[#00586D]">
        <h2 className="uppercase text-center">3d printers & cnc</h2>
      </div>
      <Image src={img} width={500} height={100} alt="" />
    </div>
  );
};

export default CategoryCard;

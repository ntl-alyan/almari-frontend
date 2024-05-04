import React,{useEffect,useState} from 'react'
import Papa from 'papaparse';
import ProductCard from '../../src/components/ProductCard'
import CardComponent from '../../src/components/CardComponent'
import Layout from "../../src/app/layout"
import { almariService } from '../../services/customer';
import { useRouter } from "next/router";

// import {scrappedDataService} from "../../services/dataFetching"

export default function MatchingItems ()  {
    const router = useRouter();
    let { image_url } = router.query;

	const [data, setData] = useState([]);
	const [cardData,setCardData]=useState([]);

	const prepareCardData=(data)=>{
		let productData=[];
		data.forEach((element,index) => {
			productData.push({
				image: element.image.includes('https:') ? element.image : 'https:'+element.image ,
				title:element.title,
				description:element.description,
				price:element.price,
			})
		}); 
		setCardData(productData);
	}

  const fetchData = async () => {
    const payload={
        image_url:image_url
    }
    const response=await almariService.predictModel(payload);

    if(response)
    {
        prepareCardData(response.matching_rows);
    }
  };

  useEffect(() => {
    if(image_url)
    {
        fetchData();
    }
  }, [image_url]);


  return (
    <Layout>
      <div>
          <CardComponent data={cardData} />
      </div>
    </Layout>
    );
};
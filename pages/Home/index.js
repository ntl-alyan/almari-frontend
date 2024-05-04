import React from 'react'
import Hero from '../../src/components/Hero';
import NewProducts from '../../src/components/NewProducts';
import Testimonial from '../../src/components/Testimonial';

import Layout from '../../src/app/layout';
export default function Home() {
  return (
  <>
  <Layout>
  <Hero />
	  <NewProducts />
	  <Testimonial />
  </Layout>
 
  </>
  )
}

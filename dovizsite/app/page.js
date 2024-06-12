"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Veri from '../components/Veri'
import React, { useState, useEffect } from 'react';
import './globals.css';

export default function Page() {
 

  return (
    <div>
      <Navbar />
      <Veri/>
      <Footer />
    </div>
  );
}

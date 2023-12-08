import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import NotificationBoard from '../../components/Notification/notificationBoard';

function NotificationPage() {
  return (
    <>
    <Header />
    <NotificationBoard />
    <Footer />
    </>
  );
}

export default NotificationPage;
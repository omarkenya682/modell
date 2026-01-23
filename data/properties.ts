import { Property } from '../types';

/**
 * HOW TO ADD A NEW PROPERTY:
 * 1. Copy one of the objects below (from { to },).
 * 2. Paste it at the bottom of the list.
 * 3. Update the details.
 */

export const properties: Property[] = [
  {
    id: "1",
    title: "Hope Gardens Phase I",
    location: "Naserian, next to Naserian primary",
    price: "KES 350,000",
    deposit: "KES 50,000",
    paymentPlan: "12 Months",
    size: "1/8 Acre",
    image: "https://i.ibb.co/wNYpbfqJ/Hope-Gardens-Phase-I-png.jpg",
    features: [
      "Ready Title",
      "Flexible Plan"
    ],
    status: "Selling Fast"
  },
  {
    id: "2",
    title: "Hope Gardens Phase II",
    location: "Naserian, 3km from KCA Uni",
    price: "KES 450,000",
    deposit: "KES 50,000",
    paymentPlan: "12 Months",
    size: "1/8 Acre",
    image: "https://i.ibb.co/d0FsrPLt/Hope-Gardens-Phase-II-png.jpg",
    features: [
      "Ready Title",
      "Flexible Plan"
    ],
    status: "Available"
  },
  {
    id: "3",
    title: "KCA Phase 5",
    location: "KCA University",
    price: "KES 450,000",
    deposit: "KES 50,000",
    paymentPlan: "15 Months",
    size: "1/8 Acre",
    image: "https://i.ibb.co/DFmBNmr/KCA-Phase-5-png.jpg",
    features: [
      "Ready Title",
      "Commercial Plots"
    ],
    status: "Available"
  },
  {
    id: "4",
    title: "Royal Gardens Phase II",
    location: "Kisaju, 3km off Namanga Rd",
    price: "KES 900,000",
    deposit: "KES 100,000",
    paymentPlan: "15 Months",
    size: "1/8 Acre",
    image: "https://i.ibb.co/twsqT8w2/Royal-Gardens-Phase-II-png.jpg",
    features: [
      "Ready Title",
      "Prime Location"
    ],
    status: "Available"
  }
];
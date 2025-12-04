// src/routeCalculator.js

import L from "leaflet";
import "leaflet-routing-machine";

// PERUBAHAN DI SINI: Menambahkan serviceUrl untuk menggunakan profil "bike"
const osrm = L.Routing.osrmv1({
  serviceUrl: 'https://router.project-osrm.org/route/v1/bike/'
});

/**
 * Fungsi ini menghitung jarak & waktu tempuh asli (lewat jalan raya)
 * antara dua titik tanpa perlu menggambar di peta.
 * 
 * @param {Array} startCoord [lat, lng]
 * @param {Array} endCoord [lat, lng]
 * @returns {Promise<{distance: number, time: number}>}
 */
export const getRouteInfo = (startCoord, endCoord) => {
  return new Promise((resolve, reject) => {
    osrm.route(
      [
        L.latLng(startCoord[0], startCoord[1]),
        L.latLng(endCoord[0], endCoord[1])
      ],
      (error, routes) => {
        if (error) {
          reject(error);
        } else {
          if (routes && routes.length > 0) {
            const summary = routes[0].summary;
            resolve({
              distance: summary.totalDistance, // dalam meter
              time: summary.totalTime,       // dalam detik (INGAT: ini waktu untuk sepeda)
            });
          } else {
            reject(new Error("Rute tidak ditemukan."));
          }
        }
      }
    );
  });
};
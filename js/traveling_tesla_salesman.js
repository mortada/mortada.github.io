
function toggleMarkers() {
    if (document.getElementById('show-superchargers').checked) {
        showMarkers();
    } else {
        clearMarkers();
    }
}

function toggleLine() {
    if (document.getElementById('show-path').checked) {
        addLine();
    } else {
        removeLine();
    }
}

var flightPath;
var map;
var bounds = new google.maps.LatLngBounds();
var markers = [];

function initialize() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39, -100),
    };

    map = new google.maps.Map(document.getElementById('container'), mapOptions);
    var superChargers = [
        ['Albany Supercharger', 42.710356, -73.819109],
        ['Brattleboro Supercharger', 42.838443, -72.565798],
        ['Hooksett (Southbound) Supercharger', 43.109066, -71.477768],
        ['Hooksett (Northbound) Supercharger', 43.110070, -71.475065],
        ['Sagamore Beach Supercharger', 41.781195, -70.540289],
        ['East Greenwich Supercharger', 41.660517, -71.497242],
        ['Auburn Massachusetts Supercharger', 42.203734, -71.833059],
        ['West Springfield Supercharger', 42.130914, -72.621435],
        ['West Hartford Supercharger', 41.722672, -72.759717],
        ['Milford North Supercharger', 41.245823, -73.009059],
        ['Milford South Supercharger', 41.246242, -73.010522],
        ['Darien North Supercharger', 41.080103, -73.461350],
        ['Darien South Supercharger', 41.067306, -73.504917],
        ['Greenwich North Supercharger', 41.041538, -73.671661],
        ['Greenwich South Supercharger', 41.040555, -73.673445],
        ['Long Island-Syosset', 40.799900, -73.515200],
        ['JFK Supercharger', 40.663190, -73.793192],
        ['Paramus-Route 17', 40.957479, -74.074191],
        ['Edison Supercharger', 40.544595, -74.334113],
        ['Hamilton Township Supercharger', 40.195539, -74.641375],
        ['Newark Supercharger', 39.662265, -75.692027],
        ['Salisbury Supercharger', 38.401600, -75.564890],
        ['Plymouth Supercharger', 35.850587, -76.756116],
        ['Rocky Mount Supercharger', 35.972904, -77.846845],
        ['Lumberton Supercharger', 34.667629, -79.002343],
        ['Santee Supercharger', 33.485858, -80.475763],
        ['Savannah Supercharger', 32.135885, -81.212853],
        ['St. Augustine Supercharger', 29.924286, -81.416018],
        ['Port Orange Supercharger', 29.108571, -81.034603],
        ['Turkey Lake Supercharger', 28.514873, -81.500189],
        ['Fort Drum Supercharger', 27.600890, -80.822860],
        ['Port St. Lucie Supercharger', 27.312983, -80.406683],
        ['West Palm Beach', 26.778115, -80.109107],
        ['Marathon Supercharger', 24.725916, -81.047519],
        ['Fort Myers Supercharger', 26.485574, -81.787149],
        ['Brandon Supercharger', 27.940665, -82.323525],
        ['Ocala Supercharger', 29.140981, -82.193938],
        ['Lake City Supercharger', 30.181405, -82.679605],
        ['Tifton Supercharger', 31.448847, -83.532210],
        ['Macon Georgia Supercharger', 32.833485, -83.625813],
        ['Atlanta-Decatur', 33.793198, -84.285394],
        ['Atlanta Supercharger', 33.793820, -84.397130],
        ['Auburn Alabama Supercharger', 32.627837, -85.445105],
        ['Greenville Supercharger', 31.855989, -86.635765],
        ['DeFuniak Springs Supercharger', 30.720702, -86.116677],
        ['Mobile Supercharger', 30.671556, -88.118644],
        ['Baton Rouge Supercharger', 30.423892, -91.154637],
        ['Lake Charles Supercharger', 30.199071, -93.248782],
        ['Huntsville Supercharger', 30.716158, -95.565944],
        ['Columbus Supercharger', 29.690066, -96.537727],
        ['San Marcos Supercharger', 29.827707, -97.979685],
        ['Waco Supercharger', 31.582287, -97.109152],
        ['Corsicana Supercharger', 32.068583, -96.448248],
        ['Ardmore Supercharger', 34.179106, -97.165632],
        ['Shamrock', 35.226765, -100.248360],
        ['Weatherford Supercharger', 35.538590, -98.660120],
        ['Perry Supercharger', 36.289315, -97.325935],
        ['Wichita Kansas Supercharger', 37.608780, -97.333140],
        ['Topeka Supercharger', 39.044394, -95.760226],
        ['Independence Supercharger', 39.040814, -94.369265],
        ['Council Bluffs Supercharger', 41.220921, -95.835579],
        ['Salina Supercharger', 38.877384, -97.618715],
        ['Hays Supercharger', 38.900426, -99.318563],
        ['Goodland Supercharger', 39.326258, -101.725107],
        ['Limon Supercharger', 39.269374, -103.708717],
        ['Lone Tree-Park Meadows', 39.561044, -104.875640],
        ['Denver Supercharger', 39.775120, -104.794648],
        ['Cheyenne Supercharger', 41.161085, -104.804955],
        ['Silverthorne Supercharger', 39.631467, -106.070818],
        ['Glenwood Springs Supercharger', 39.552676, -107.340171],
        ['Grand Junction Supercharger', 39.090758, -108.604325],
        ['Green River Supercharger', 38.993577, -110.140513],
        ['Moab Supercharger', 38.573122, -109.552368],
        ['Blanding Supercharger', 37.625618, -109.473842],
        ['Farmington Supercharger', 36.766315, -108.144266],
        ['Tucumcari Supercharger', 35.153960, -103.722600],
        ['Santa Rosa Supercharger', 34.947013, -104.647997],
        ['Gallup Supercharger', 35.505278, -108.828094],
        ['Holbrook Supercharger', 34.922962, -110.145558],
        ['Flagstaff Supercharger', 35.174151, -111.663194],
        ['Cordes Lakes Supercharger', 34.327530, -112.118460],
        ['Wickenburg Supercharger', 33.970281, -112.731503],
        ['Buckeye Supercharger', 33.443011, -112.556876],
        ['Casa Grande Supercharger', 32.878773, -111.681694],
        ['Gila Bend Supercharger', 32.943675, -112.734081],
        ['Quartzsite Supercharger', 33.660784, -114.241801],
        ['Yuma Supercharger', 32.726686, -114.619093],
        ['El Centro Supercharger', 32.760837, -115.532486],
        ['San Diego Supercharger', 32.902940, -117.194181],
        ['San Juan Capistrano Supercharger', 33.498538, -117.663090],
        ['Redondo Beach Supercharger', 33.894227, -118.367407],
        ['Los Angeles Supercharger', 33.921063, -118.330074],
        ['Culver City Supercharger', 33.986765, -118.390162],
        ['Oxnard Supercharger', 34.238115, -119.178084],
        ['Tejon Ranch Supercharger', 34.987370, -118.946272],
        ['Buellton Supercharger', 34.614555, -120.188432],
        ['Atascadero Supercharger', 35.486585, -120.666378],
        ['Harris Ranch Supercharger', 36.254143, -120.237920],
        ['Lone Pine Supercharger', 36.600590, -118.061916],
        ['Inyokern Supercharger', 35.646451, -117.812644],
        ['Mojave Supercharger', 35.068595, -118.174576],
        ['Barstow Supercharger', 34.849109, -117.085442],
        ['Rancho Cucamonga Supercharger', 34.113584, -117.529427],
        ['Cabazon Supercharger', 33.931316, -116.820082],
        ['Indio Supercharger', 33.741291, -116.215029],
        ['Needles Supercharger', 34.850835, -114.624329],
        ['Kingman Supercharger', 35.191331, -114.065592],
        ['Primm Supercharger', 35.610678, -115.388014],
        ['Las Vegas Supercharger', 36.165906, -115.138655],
        ['St. George Supercharger', 37.126463, -113.601737],
        ['Beaver Supercharger', 38.249149, -112.652524],
        ['Richfield Supercharger', 38.787990, -112.085173],
        ['Nephi Supercharger', 39.678111, -111.841003],
        ['Salt Lake City-S. State Street', 40.720900, -111.888395],
        ['Tooele Supercharger', 40.684466, -112.269008],
        ['Tremonton Supercharger', 41.709950, -112.198576],
        ['West Wendover Supercharger', 40.738399, -114.058998],
        ['Elko Supercharger', 40.836301, -115.790859],
        ['Winnemucca Supercharger', 40.958869, -117.746501],
        ['Lovelock Supercharger', 40.179476, -118.472135],
        ['Truckee Supercharger', 39.327438, -120.207410],
        ['Sacramento-Rocklin', 38.800537, -121.210485],
        ['Roseville Supercharger', 38.771208, -121.266149],
        ['Folsom Supercharger', 38.642291, -121.188130],
        ['Manteca Supercharger', 37.782622, -121.228683],
        ['Gilroy Supercharger', 37.024450, -121.565350],
        ['Mountain View Supercharger', 37.415328, -122.076575],
        ['Fremont', 37.492439, -121.944725],
        ['Petaluma Supercharger', 38.242676, -122.625023],
        ['Vacaville Supercharger', 38.366645, -121.958136],
        ['Corning Supercharger', 39.926460, -122.198400],
        ['Mt. Shasta Supercharger', 41.310222, -122.317310],
        ['Grants Pass Supercharger', 42.460931, -123.324124],
        ['Springfield Supercharger', 44.082607, -123.037458],
        ['Detroit Lake Supercharger', 44.737025, -122.152108],
        ['Woodburn Supercharger', 45.153130, -122.881254],
        ['The Dalles Supercharger', 45.611941, -121.208249],
        ['Centralia Supercharger', 46.729872, -122.977392],
        ['Burlington Supercharger', 48.509771, -122.338627],
        ['Ellensburg Supercharger', 46.976918, -120.541620],
        ['Pendleton Supercharger', 45.646550, -118.681980],
        ['Ritzville Supercharger', 47.116294, -118.368328],
        ['Coeur d\'Alene Supercharger', 47.708479, -116.794283],
        ['Superior Supercharger', 47.192149, -114.888901],
        ['Missoula Supercharger', 46.914375, -114.031924],
        ['Butte Supercharger', 45.981226, -112.507161],
        ['Bozeman Supercharger', 45.700070, -111.063290],
        ['Big Timber Supercharger', 45.836260, -109.943410],
        ['Billings Supercharger', 45.734046, -108.604932],
        ['Lusk Supercharger', 42.756250, -104.452670],
        ['Rapid City Supercharger', 44.105601, -103.212569],
        ['Murdo Supercharger', 43.886915, -100.716887],
        ['Mitchell Supercharger', 43.701129, -98.044500],
        ['Worthington Supercharger', 43.633850, -95.595647],
        ['Albert Lea Supercharger', 43.686060, -93.357721],
        ['Eau Claire Supercharger', 44.770830, -91.437110],
        ['La Crosse Supercharger', 43.879042, -91.188428],
        ['Mauston Supercharger', 43.795551, -90.059358],
        ['Madison Supercharger', 43.126690, -89.306896],
        ['Rockford Supercharger', 42.243893, -88.978895],
        ['Pleasant Prairie Supercharger', 42.518715, -87.950428],
        ['Chicago-Highland Park', 42.174255, -87.816196],
        ['Country Club Hills Supercharger', 41.585206, -87.721114],
        ['Aurora Supercharger', 41.760671, -88.309184],
        ['Normal Supercharger', 40.508562, -88.984738],
        ['Springfield Illinois Supercharger', 39.748868, -89.671190],
        ['St. Charles Supercharger', 38.782160, -90.532900],
        ['Effingham Supercharger', 39.137114, -88.563468],
        ['Indianapolis Supercharger', 39.702238, -86.079590],
        ['Lafayette Supercharger', 40.416707, -86.814045],
        ['Mishawaka Supercharger', 41.717337, -86.188630],
        ['St. Joseph Supercharger', 42.056357, -86.456352],
        ['Angola Supercharger', 41.699048, -85.000326],
        ['Maumee Supercharger', 41.578330, -83.664593],
        ['Lima Supercharger', 40.726668, -84.071932],
        ['Grove City Supercharger', 39.877253, -83.063448],
        ['Dayton Supercharger', 39.858702, -84.277027],
        ['Cincinnati-Blue Ash Road', 39.224458, -84.383926],
        ['Lexington Supercharger', 38.017955, -84.420664],
        ['London Supercharger', 37.149160, -84.113850],
        ['Knoxville Supercharger', 35.901319, -84.149634],
        ['Chattanooga Supercharger', 35.038644, -85.195930],
        ['Charlotte Supercharger', 35.340750, -80.765790],
        ['Burlington NC Supercharger', 36.070788, -79.511222],
        ['South Hill Supercharger', 36.748516, -78.103517],
        ['Glen Allen Supercharger', 37.669760, -77.461414],
        ['Woodbridge Supercharger', 38.640820, -77.296330],
        ['Bethesda-Montgomery Mall', 39.023876, -77.144352],
        ['Hagerstown Supercharger', 39.605859, -77.733324],
        ['Somerset Supercharger', 40.017517, -79.077120],
        ['Triadelphia Supercharger', 40.061396, -80.602400],
        ['Cranberry Township Supercharger', 40.683508, -80.108327],
        ['Macedonia Supercharger', 41.313615, -81.517109],
        ['Buffalo Supercharger', 42.968675, -78.695680],
        ['Syracuse Supercharger', 43.102424, -76.187446],
        ['Utica Supercharger', 43.113878, -75.206857]
    ];

    var flightPlanCoordinates = [];
    var len = superChargers.length;
    for (var i = 0; i < len; i++) {
        var myLatLng = new google.maps.LatLng(superChargers[i][1], superChargers[i][2]);
        flightPlanCoordinates.push(myLatLng);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: '/images/icon-supercharger-small.png',
            title: superChargers[i][0]
        });
        markers.push(marker);
        bounds.extend(marker.getPosition());
    }
    // connect back to first node
    flightPlanCoordinates.push(new google.maps.LatLng(superChargers[0][1], superChargers[0][2]));

    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    // addLine();
    // overall display settings
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
}

function addLine() {
    flightPath.setMap(map);
}

function removeLine() {
    flightPath.setMap(null);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

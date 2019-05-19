const available = Number.POSITIVE_INFINITY;
const obstructed = 'obstructed';

let sourceMap = ((a, o) => [
  [ a, a, o, a, a ],
  [ a, a, o, a, a ],
  [ a, a, o, o, a ],
  [ a, a, a, a, a ],
  [ a, o, o, a, a ],
])(available, obstructed);
let points = // These points look for an answer of [3, 3].
[
  [2,1],
  [1,4],
  [4,0]
];
function defined(val) {
  return typeof val !== 'undefined'
}
function shouldPushPoint(neighbor, distance) {
  return defined(neighbor)
    && (neighbor === available
      || (neighbor !== obstructed && neighbor > distance));
}
function getVisitableNeighbors(map, point, distance) {
  let neighbors = [];
  let square;
  for (let i = -1; i <= 1; i++) {
    if (!map[point[0] + i]) continue;
    for (let j = -1; j <= 1; j++) {
      square = map[point[0] + i][point[1] + j];
      if ((i === 0 && j === 0) || (i !== 0 && j !== 0)) continue;
      if (!shouldPushPoint(square)) continue;
      neighbors.push([point[0] + i, point[1] + j]);
    }
  }
  return neighbors;
}
function getDistancesFromPoint(map, start) {
  let distances = [];
  let distance = 0;
  map.map(across => distances.push([...across]));
  distances[start[0]][start[1]] = distance;
  let neighbors = getVisitableNeighbors(map, start, distance);

  // map the distances

  // 1) start somewhere
  // get neighbors
  // remove obstacles, visited in less moves, and off map points
  // update the distances to those points
  // start at 1) again for each point.
  while (neighbors.length) {
    distance++;
    neighbors = neighbors.reduce((acc, neighbor) => {
      distances[neighbor[0]][neighbor[1]] = distance;
      return [...acc, ...getVisitableNeighbors(distances, neighbor, distance)];
    }, []);
  }

  return distances;


  // steps should build as follows for first point

  // [
  //   [ 0, 0,-1, 0, 0 ],
  //   [ 0, 0,-1, 0, 0 ],
  //   [ 0, s,-1,-1, 0 ],
  //   [ 0, 0, 0, 0, 0 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 0, 0,-1, 0, 0 ],
  //   [ 0, 1,-1, 0, 0 ],
  //   [ 1, 0,-1,-1, 0 ],
  //   [ 0, 1, 0, 0, 0 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 0, 2,-1, 0, 0 ],
  //   [ 2, 1,-1, 0, 0 ],
  //   [ 1, 0,-1,-1, 0 ],
  //   [ 2, 1, 2, 0, 0 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 3, 2,-1, 0, 0 ],
  //   [ 2, 1,-1, 0, 0 ],
  //   [ 1, 0,-1,-1, 0 ],
  //   [ 2, 1, 2, 3, 0 ],
  //   [ 3,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 3, 2,-1, 0, 0 ],
  //   [ 2, 1,-1, 0, 0 ],
  //   [ 1, 0,-1,-1, 0 ],
  //   [ 2, 1, 2, 3, 4 ],
  //   [ 3,-1,-1, 4, 0 ],
  // ];

  // [
  //   [ 3, 2,-1, 0, 0 ],
  //   [ 2, 1,-1, 0, 0 ],
  //   [ 1, 0,-1,-1, 5 ],
  //   [ 2, 1, 2, 3, 4 ],
  //   [ 3,-1,-1, 4, 5 ],
  // ];

  // [
  //   [ 3, 2,-1, 0, 0 ],
  //   [ 2, 1,-1, 0, 6 ],
  //   [ 1, 0,-1,-1, 5 ],
  //   [ 2, 1, 2, 3, 4 ],
  //   [ 3,-1,-1, 4, 5 ],
  // ];

  // [
  //   [ 3, 2,-1, 0, 7 ],
  //   [ 2, 1,-1, 7, 6 ],
  //   [ 1, 0,-1,-1, 5 ],
  //   [ 2, 1, 2, 3, 4 ],
  //   [ 3,-1,-1, 4, 5 ],
  // ];

  // [
  //   [ 3, 2,-1, 8, 7 ],
  //   [ 2, 1,-1, 7, 6 ],
  //   [ 1, 0,-1,-1, 5 ],
  //   [ 2, 1, 2, 3, 4 ],
  //   [ 3,-1,-1, 4, 5 ],
  // ];

  // steps should build as follows for second point

  // [
  //   [ 0, 0,-1, 0, 0 ],
  //   [ 0, 0,-1, 0, s ],
  //   [ 0, 0,-1,-1, 0 ],
  //   [ 0, 0, 0, 0, 0 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 0, 0,-1, 0, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 0,-1,-1, 1 ],
  //   [ 0, 0, 0, 0, 0 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 0,-1,-1, 1 ],
  //   [ 0, 0, 0, 0, 2 ],
  //   [ 0,-1,-1, 0, 0 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 0,-1,-1, 1 ],
  //   [ 0, 0, 0, 3, 2 ],
  //   [ 0,-1,-1, 0, 3 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 0,-1,-1, 1 ],
  //   [ 0, 0, 4, 3, 2 ],
  //   [ 0,-1,-1, 4, 3 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 0,-1,-1, 1 ],
  //   [ 0, 5, 4, 3, 2 ],
  //   [ 0,-1,-1, 4, 3 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 0,-1, 1, 0 ],
  //   [ 0, 6,-1,-1, 1 ],
  //   [ 6, 5, 4, 3, 2 ],
  //   [ 0,-1,-1, 4, 3 ],
  // ];

  // [
  //   [ 0, 0,-1, 2, 1 ],
  //   [ 0, 7,-1, 1, 0 ],
  //   [ 7, 6,-1,-1, 1 ],
  //   [ 6, 5, 4, 3, 2 ],
  //   [ 7,-1,-1, 4, 3 ],
  // ];

  // [
  //   [ 0, 8,-1, 2, 1 ],
  //   [ 8, 7,-1, 1, 0 ],
  //   [ 7, 6,-1,-1, 1 ],
  //   [ 6, 5, 4, 3, 2 ],
  //   [ 7,-1,-1, 4, 3 ],
  // ];

  // [
  //   [ 9, 8,-1, 2, 1 ],
  //   [ 8, 7,-1, 1, 0 ],
  //   [ 7, 6,-1,-1, 1 ],
  //   [ 6, 5, 4, 3, 2 ],
  //   [ 7,-1,-1, 4, 3 ],
  // ];

  return distances;
}
function mapDistances(map, points) {
  return points.map(function(point) {
    return getDistancesFromPoint(map, point);
  });
}
let distances = mapDistances([...sourceMap], points);
function sumTheDistances(distances) {
  let sums = [];
  let sum = 0;
  sourceMap.map((across, i) => {
    sums.push([]);
    across.map((square, j) => {
      sum = 0;
      distances.map(distance => {
        if (distance[i][j] === obstructed) {
          sum = obstructed;
        } else {
          sum += distance[i][j];
        }
      });
      sums[i].push(sum)
    });
  });
  return sums;
}
let distancesSums = sumTheDistances(distances);
function findOptimalLanding(distancesSums) {
  let optimal = {
    points: [],
    distance: available
  };
  let shortest = Number.POSITIVE_INFINITY;
  distancesSums.map((across, i) => {
    across.map((sum, j) => {
      if (sum > -1 && sum <= shortest) {
        shortest = sum;
        if (shortest < optimal.distance) {
          optimal.distance = shortest;
          optimal.points = [];
        }
        optimal.points.push([i, j]);
      }
    });
  });
  return optimal;
}
console.log(distancesSums);
let optimalLanding = findOptimalLanding(distancesSums);
console.log(optimalLanding);
function isOptimalClass(distance, optimalLanding) {
  return distance === optimalLanding.distance
    ? 'best'
    : '';
}
function isOriginSquareClass(points, row, col) {
  return points.filter(point => (point[0] === row && point[1] === col)).length
    ? 'origin'
    : '';
}
document.body.innerHTML = `
  ${distancesSums.map(
    (row, i) => row.map(
      (square, j) => `<div class="${isOptimalClass(square, optimalLanding)} ${isOriginSquareClass(points, i, j)}">${square}</div>`
    ).join('')
  ).join('')}
`;

const available = Number.POSITIVE_INFINITY;
const obstructed = 'obstructed';

let sourceMap = (() => {
  const a = available;
  const o = obstructed;
  return [
    [ a, a, o, a, a ],
    [ a, a, o, a, a ],
    [ a, a, o, o, a ],
    [ a, a, a, a, a ],
    [ a, o, o, a, a ],
  ]
})();
let points = // These points look for an answer of [3, 3].
[
  [2,1],
  [1,4],
  // [4,0]
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
  let neighbor = map[point[0] - 1];
  if (defined(neighbor)) neighbor = neighbor[point[1]];
  if (shouldPushPoint(neighbor, distance)) {
    neighbors.push([point[0] - 1, point[1]])
  }
  neighbor = map[point[0] + 1];
  if (defined(neighbor) ) neighbor = neighbor[point[1]];
  if (shouldPushPoint(neighbor, distance)) {
    neighbors.push([point[0] + 1, point[1]])
  }
  neighbor = map[point[0]];
  if (defined(neighbor) ) neighbor = neighbor[[point[1] + 1]];
  if (shouldPushPoint(neighbor, distance)) {
    neighbors.push([point[0], point[1] + 1])
  }
  neighbor = map[point[0]];
  if (defined(neighbor) ) neighbor = neighbor[point[1] - 1];
  if (shouldPushPoint(neighbor, distance)) {
    neighbors.push([point[0], point[1] - 1])
  }
  return neighbors;
}
function getDistancesFromPoint(map, start) {
  let distances = [];
  let distance = 0;
  for (let j = 0, k = map.length; j < k; j++) {
    let down = [];
    for (let i = 0, l = map[j].length; i < l; i++) {
      down.push(map[j][i]);
    }
    distances.push(down);
  }
  distances[start[0]][start[1]] = 0;
  let neighbors = getVisitableNeighbors(map, start, distance);

  // map the distances

  // 1) start somewhere
  // get neighbors
  // remove obstacles, visited in less moves, and off map points
  // update the distances to those points
  // start at 1) again for each point.

  while (neighbors.length) {
    distance++;
    let newNeighbors = [];
    for (var i = 0, l = neighbors.length; i < l; i++) {
      let neighbor = neighbors[i];
      distances[neighbor[0]][neighbor[1]] = distance;
      newNeighbors = newNeighbors.concat(getVisitableNeighbors(distances, neighbor, distance));
    }
    neighbors = newNeighbors;
    console.table(distances);
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
  var sums = [];
  var sum = 0;
  for (var i = 0, across = sourceMap.length; i < across; i++) {
    sums.push([]);
    for (var j = 0, down = sourceMap[i].length; j < down; j++) {
      sum = 0;
      for (var k = 0, ct = distances.length; k < ct; k++) {
        if (distances[k][i][j] === obstructed) {
          sum = obstructed;
          continue;
        }
        sum += distances[k][i][j];
      }
      sums[i].push(sum)
    }
  }
  return sums;
}
let distancesSums = sumTheDistances(distances);
function findOptimalLanding(distancesSums) {
  // assumes a single optimal point for now.
  var optimal = {
    points: [],
    distance: available
  };
  var shortest = Number.POSITIVE_INFINITY;
  for (var i = 0, across = distancesSums.length; i < across; i++) {
    for (var j = 0, down = distancesSums[i].length; j < down; j++) {
      if (distancesSums[i][j] > -1 && distancesSums[i][j] <= shortest) {
        shortest = distancesSums[i][j];
        if (shortest < optimal.distance) {
          optimal.distance = shortest;
          optimal.points = [];
        }
        optimal.points.push([i, j]);
      }
    }
  }
  return optimal;
}
console.log(distancesSums);
let optimalLanding = findOptimalLanding(distancesSums);
console.log(optimalLanding);
document.body.innerHTML = `
  ${distancesSums.map(row => row.map(col => `<div class="${col === optimalLanding.distance ? 'best' : ''}">${col}</div>`).join('')).join('')}
`;

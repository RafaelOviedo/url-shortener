
export default function calculateCollisionProbability(n) {
  const N = 3521614606208; // 62^7
  const exponent = (-n * (n - 1)) / (2 * N);
  const probability = (1 - Math.exp(exponent));
  const percentageProbability = probability * 100;

  return percentageProbability;
}
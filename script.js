const greekMap = {
  A: "Α", B: "Β", E: "Ε", G: "Γ", D: "Δ", L: "Λ", M: "Μ",
  N: "Ν", O: "Ο", P: "Π", S: "Σ", T: "Τ", X: "Χ", Y: "Ψ", Z: "Ζ"
};

const semanticMap = {
  EXFILTRATE: "Ξ7ΦΛ9Γ",
  AT: "ΤΑ",
  HOURS: "8Η1ΡΖ"
};

const reverseSemanticMap = Object.fromEntries(
  Object.entries(semanticMap).map(([k, v]) => [v, k])
);

function applyGreekDrift(text) {
  return text.toUpperCase().split("").map(char =>
    greekMap[char] || char
  ).join("");
}

function removeGreekDrift(text) {
  const reverseGreekMap = Object.fromEntries(
    Object.entries(greekMap).map(([k, v]) => [v, k])
  );
  return text.split("").map(char =>
    reverseGreekMap[char] || char
  ).join("");
}

function applySemanticSubstitution(text) {
  let result = text.toUpperCase();
  for (let word in semanticMap) {
    result = result.replaceAll(word, semanticMap[word]);
  }
  return result;
}

function reverseSemanticSubstitution(text) {
  let result = text;
  for (let code in reverseSemanticMap) {
    result = result.replaceAll(code, reverseSemanticMap[code]);
  }
  return result;
}

function addPhantomPadding(text) {
  return text.split("").map((char, i) =>
    (i + 1) % 5 === 0 ? char + randomChar() : char
  ).join("");
}

function removePhantomPadding(text) {
  return text.replace(/(.{4})./g, "$1");
}

function randomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

function encode() {
  let input = document.getElementById("inputText").value;
  let header = "ΔX3ΛΨ";
  let encoded = applySemanticSubstitution(input);
  encoded = applyGreekDrift(encoded);
  encoded = addPhantomPadding(encoded);
  document.getElementById("outputText").value = header + " " + encoded;
}

function decode() {
  let input = document.getElementById("inputText").value;
  let body = input.slice(6).trim(); // remove header
  let cleaned = removePhantomPadding(body);
  cleaned = removeGreekDrift(cleaned);
  cleaned = reverseSemanticSubstitution(cleaned);
  document.getElementById("outputText").value = cleaned;
}

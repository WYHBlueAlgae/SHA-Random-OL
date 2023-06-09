const m = BigInt("0xc6a4a7935bd1e995");
const n = BigInt("0x5bd1e995");

function MurmurHash64A(key, len, seed) {
  const data = new BigInt64Array(new Uint8Array(key).buffer);
  const nblocks = len / 8;

  let h = BigInt(seed);

  for (let i = 0; i < nblocks; i++) {
    let k = data[i] * m;
    k ^= k >> 47n;
    k *= m;

    h ^= k;
    h *= m;
  }

  const tail = new Uint8Array(key.slice(nblocks * 8));
  let k1 = 0n;

  switch (len & 7) {
    case 7:
      k1 ^= BigInt(tail[6]) << 48n;
    case 6:
      k1 ^= BigInt(tail[5]) << 40n;
    case 5:
      k1 ^= BigInt(tail[4]) << 32n;
    case 4:
      k1 ^= BigInt(tail[3]) << 24n;
    case 3:
      k1 ^= BigInt(tail[2]) << 16n;
    case 2:
      k1 ^= BigInt(tail[1]) << 8n;
    case 1:
      k1 ^= BigInt(tail[0]) << 0n;
      k1 *= m;
      h ^= k1;
  }

  h ^= BigInt(len);
  h ^= h >> 47n;
  h *= m;
  h ^= h >> 47n;

  return h;
}

while (true) {
  const nw = parseInt(prompt("输入占卜范围(如64、256):"));
  const str = prompt("输入占卜目的:");
  const str2 = prompt("输入随机字符串种子加强随机性:");

  const hash = MurmurHash64A(str, str.length, 0);
  const hash2 = MurmurHash64A(str2, str2.length, 0);
  const tint = Math.floor(Date.now() / 1000);

  const seed_combined = Number(hash ^ hash2 ^ tint);
  Math.seedrandom(seed_combined);

  const randout = Math.floor(Math.random() * 2147483648);
  const now = new Date();
  console.log("随机结果>", randout);
  console.log("运算时间>", now);
  console.log("第一结果(静爻)>", randout % nw);
  console.log("第二结果(动爻)>", Math.abs(seed_combined) % nw);
}

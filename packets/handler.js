function parsePacketByteBuf(buffer) {
  const length = buffer[0];
  const packetId = buffer[1];

  const parsedPacket = {
    length: length,
    packetId: packetId,
    data: buffer.slice(2).toJSON().data,
  };

  return parsedPacket;
}

module.exports = { parsePacketByteBuf };

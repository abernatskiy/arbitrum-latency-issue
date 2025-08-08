import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { assertNotNull } from "@subsquid/util-internal";

const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ARBITRUM_ONE_HTTP, "RPC_ARBITRUM_ONE_HTTP is required"),
    rateLimit: 100,
    capacity: 50,
    maxBatchCallSize: 10,
    requestTimeout: 60_000,
  })
  .setFinalityConfirmation(20)
  .setBlockRange({
    from: 366290000,
  })
  .setFields({
    log: {
      data: true,
      topics: true,
      transactionHash: true,
    },
  })
  .addLog({})

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  console.log(`Got blocks ${ctx.blocks[0].header.height}-${ctx.blocks[ctx.blocks.length-1].header.height}`)
});

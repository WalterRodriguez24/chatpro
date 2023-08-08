/**
 * @typedef {Object} Response
 * @property {string} id
 * @property {'main'|'response'} type
 * @property {string} question
 * @property {string} entry
 * @property {Response[]} responses
 * @property {boolean} showResponses
 */

/**
 * @typedef {Object} Node
 * @property {string} name
 * @property {Response[]} responses
 */

/**
 * @type {Object[]}
 */
const chatData = [
  {
    name: "asdasd",
    flow: {
      nodes: [
        {
          id: "lkobes9teswuq8kyouf",
          type: "main",
          question: "pregunta principal zzzz",
          entry: "entrada principal",
          responses: [
            {
              id: "lkobeu4ph2tax2avaaaanz",
              type: "response",
              question: "respuesta anidada 1",
              entry: "entrada anidada 1",
              responses: [
                {
                  id: "lkobevm9dggrf3cz4yp",
                  type: "response",
                  question: "respuesta anidada 1.1",
                  entry: "entrada anidada 1.1",
                  responses: [
                    {
                      id: "lkobexbdsyhktgqgzqp",
                      type: "response",
                      question: "entry",
                      parentId: "lkobevm9dggrf3cz4yp",
                      showResponses: true,
                      responses: [
                        {
                          id: "lkobexbdsyhktgqgzqp",
                          type: "response",
                          question: "entry",
                          responses: [],
                          parentId: "lkobevm9dggrf3cz4yp",
                          showResponses: true,
                        },
                      ],
                    },
                  ],
                  parentId: "lkobeu4ph2tax2avnz",
                  showResponses: true,
                },
              ],
              parentId: "lkobes9teswuq8kyossssuf",
              showResponses: true,
            },
            {
              id: "lkobeygpkgc7xi9yfr",
              type: "response",
              question: "pregunta anidada 2",
              entry: "entrada anidada 2",
              responses: [
                {
                  id: "lkobeygpkgc7aaaaxi9yfr",
                  type: "response",
                  question: "pregunta anidada 2",
                  entry: "entrada anidada 2",
                  responses: [],
                  parentId: "lkobes9tesdadadadwuq8kyouf",
                  showResponses: true,
                },
              ],
              parentId: "lkobes9teaaaswuq8kyouf",
              showResponses: true,
            },
            {
              id: "lkobf16pnphdr0yru1",
              type: "response",
              question: "respuesta anidada 3",
              entry: "entrada anidada 3",
              responses: [],
              parentId: "lkobes9teswuq8kyouadaf",
              showResponses: true,
            },
            {
              id: "lkobf3416mu8c4bihba",
              type: "response",
              question: "respuesta anidada 4",
              entry: "entrada anidada 4",
              responses: [],
              parentId: "lkobes9teswuq8kyou",
              showResponses: true,
            },
          ],
          showResponses: true,
        },
        {
          id: "lkobf5m9blosppllffm",
          type: "main",
          question: "asdasd",
          entry: "asdasd",
          responses: [],
          showResponses: true,
        },
      ],
    },
  },
];

/**
 * @type {Node[]}
 */
export const mappedData = chatData.map((item) => {
  return {
    name: item.name,
    responses: item.flow.nodes.map((node) => {
      return {
        id: node.id,
        type: node.type,
        question: node.question,
        entry: node.entry,
        responses: node.responses,
        showResponses: node.showResponses,
      };
    }),
  };
});

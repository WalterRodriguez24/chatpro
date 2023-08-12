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
    "name": "",
    "flow": {
      "nodes": [
        {
          "id": "",
          "type": "main",
          "question": "",
          "entry": "",
          "responses": [],
          "showResponses": true
    }
  ]
  }
  }
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

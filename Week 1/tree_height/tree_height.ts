class Tree {
	tree: Array<number>;
	maxDepth = 0;

	constructor(line: string) {
		this.tree = line.split(' ').map(function(el) { return parseInt(el, 10); });
	}

	computeHeight():number {
    let depths = [];
    let currDepth = 1;

    for (let i = 0; i < this.tree.length; i++) {
			currDepth = 1;

			let index = i;
			while (index !== -1) {
				if ((index = this.tree[index]) === -1) {
					break;
				}
					
				//take cached 
				if (depths[index]) {
					currDepth += depths[index];
					index = -1;
				} else {
					currDepth++;
				}

				if (currDepth > this.maxDepth) {
					this.maxDepth = currDepth;
				}
			}

			depths.push(currDepth);
    }

    return this.maxDepth;
	}
} 

// Alternative method, with higher O()
// class Tree {
// 		n: number;
// 		parent: Array<string>;
// 		vertices: Array<string>;
// 		height = 1;

// 		constructor(n: number) {
// 			this.n = n;
// 		}

// 		addToStack(parent: string, depth: number):number {
// 			let d = depth + 1;
// 			if (d > this.height) {
// 				this.height = d;
// 			}
// 			// console.log("depth",d);
// 			for(let i = 0; i < this.vertices.length;i++) {
// 				if(this.vertices[i] == parent){
// 					this.parent.push(i.toString());
// 					this.addToStack(i, d);
// 				}
// 			}
// 			return d;
// 		}

// 		computeHeight(line: string):number {
// 			let maxDepth = this.n;
// 			this.vertices = line.split(" ");
// 			const root = this.vertices.indexOf("-1").toString();
// 			this.parent = [root];
// 			this.addToStack(root.toString(), 0)

// 			return this.height;
// 		}
// }

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 1;
rl.on('line', function(line){
	if(lineNumber === 2){
		let tree = new Tree(line);
		console.log(tree.computeHeight());
		process.exit();
	}
	lineNumber++;
})

// const testFolder = './tests/';
// const fs = require('fs');
// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
// 		if(file.indexOf(".a")=== -1){
// 			fs.readFile(testFolder+file, 'utf8', (err, data) => {
// 				let lines = data.split("\r\n");
// 				let tree = new Tree(lines[1]);
// 				console.log(`${tree.computeHeight()}`);
// 			});
// 		}
//   });
// })
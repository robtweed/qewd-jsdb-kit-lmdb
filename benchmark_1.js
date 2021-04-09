var dbxbdb = require('mg-dbx-bdb').dbxbdb;
var mglobal = require('mg-dbx-bdb').mglobal;
var db = new dbxbdb();

var lmdb = process.argv[2];
var net = process.argv[3];

if (process.platform == 'win32') {
   if (lmdb == 1)
      var open = db.open({type: "LMDB", db_library: "c:/LMDBWindows/lib/LMDBWindowsDll64.dll", env_dir: "c:/c/node.js/bdb/lmdbmi", key_type: "mumps"});
   else
      var open = db.open({type: "BDB", db_library: "c:/c/bdb/libdb181.dll", db_file: "c:/c/bdb/bmbdbmi.db", key_type: "mumps"});
}
else {
   if (lmdb == 1)
      var open = db.open({type: "LMDB", db_library: "liblmdb.so", env_dir: "/opt/lmdb", key_type: "m"});
   else
      var open = db.open({type: "BDB", db_library: "/usr/local/BerkeleyDB.18.1/lib/libdb.so", db_file: "/opt/bdb/my_bdb_database.db", key_type: "mumps"});
}

console.log("\n\nopen(): " + open);
console.log("\n\nVersion (mg-dbx-bdb.node): " + db.version());
var max = 100000;
var global = new mglobal(db, 'cm');
var d1 = new Date();
var d1_ms = d1.getTime()
console.log("d1: " + d1.toISOString());
var n = 0;
for (n = 1; n <= max; n ++) {
   global.set(n, "Chris Munt");
   //console.log(n + " = " + "Chris Munt");
}

var d2 = new Date();
var d2_ms = d2.getTime()
var diff = Math.abs(d1_ms - d2_ms)
console.log("d2: " + d2.toISOString());
console.log("records: " + max + " diff: " + diff + " secs: " + (diff / 1000));

db.close();
console.log("*** the end ***\n");

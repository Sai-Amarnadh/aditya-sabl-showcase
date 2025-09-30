@@ .. @@
         {/* Gallery Stats */}
-        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
-          <div className="stats-card-navy text-center animate-slide-up">
-            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
+        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
+          <div className="stats-card-navy-glow text-center animate-slide-up">
+            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 icon-glow-white">
               <Image className="h-6 w-6 text-white" />
             </div>
             <div className="text-xl sm:text-2xl font-bold mb-1">{photos.length}</div>
@@ .. @@

-          <div className="stats-card-light text-center sm:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
-            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
+          <div className="stats-card-glow-white text-center sm:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
+            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 icon-glow-primary">
               <Grid className="h-6 w-6 text-primary" />
             </div>
             <div className="text-xl sm:text-2xl font-bold mb-1 text-primary">A Growing Collection</div>
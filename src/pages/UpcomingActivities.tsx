@@ .. @@
         {/* Quick Stats */}
-        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 my-12 sm:my-16">
-          <div className="dual-border-card stats-card-navy text-center animate-slide-up hover-lift-enhanced">
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 my-12 sm:my-16">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover-lift-enhanced">
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <Calendar className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">{upcomingActivities.length}</div>
@@ .. @@

-          <div className="dual-border-card stats-card-orange text-center animate-slide-up hover-lift-enhanced" style={{ animationDelay: '0.1s' }}>
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+          <div className="stats-card-orange-glow text-center animate-slide-up hover-lift-enhanced" style={{ animationDelay: '0.1s' }}>
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <Clock className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">Next 30 Days</div>
@@ .. @@

-          <div className="dual-border-card stats-card-navy text-center animate-slide-up hover-lift-enhanced" style={{ animationDelay: '0.2s' }}>
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover-lift-enhanced" style={{ animationDelay: '0.2s' }}>
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <MapPin className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">CSE Campus</div>
@@ .. @@

         {/* Call to Action */}
-        <div className="mt-16 sm:mt-20 dual-border-card stats-card-navy rounded-3xl p-8 sm:p-12 text-center text-white shadow-elevated animate-slide-up mx-2 sm:mx-0 hover-lift-enhanced">
+        <div className="mt-16 sm:mt-20 stats-card-navy-enhanced rounded-3xl p-8 sm:p-12 text-center text-white shadow-elevated animate-slide-up mx-2 sm:mx-0 hover-lift-enhanced relative overflow-hidden">
+          {/* Internal glow effects */}
+          <div className="absolute top-0 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
+          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
+          
           <div className="relative inline-block mb-6">
             <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg"></div>
-            <div className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
+            <div className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto icon-glow-white">
               <Users className="h-10 w-10 text-white" />
             </div>
           </div>
-          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Don't Miss Out!</h2>
-          <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
+          <h2 className="text-2xl sm:text-3xl font-bold mb-6 relative z-10 stats-title-glow">Don't Miss Out!</h2>
+          <p className="text-lg sm:text-xl opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
             Stay connected with us to get the latest updates on upcoming activities and registration details.
           </p>
-          <div className="flex flex-col sm:flex-row gap-6 justify-center">
-            <div className="flex items-center justify-center text-sm sm:text-base opacity-90 bg-white/10 px-4 py-2 rounded-full">
+          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
+            <div className="flex items-center justify-center text-sm sm:text-base opacity-95 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
               <Calendar className="h-4 w-4 mr-2" />
               Follow our event calendar
             </div>
-            <div className="flex items-center justify-center text-sm sm:text-base opacity-90 bg-white/10 px-4 py-2 rounded-full">
+            <div className="flex items-center justify-center text-sm sm:text-base opacity-95 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
               <Clock className="h-4 w-4 mr-2" />
               Register early for best spots
             </div>
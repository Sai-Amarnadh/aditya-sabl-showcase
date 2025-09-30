@@ .. @@
         {/* Achievement Stats */}
-        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 my-12 sm:my-16">
-          <div className="dual-border-card stats-card-navy text-center animate-slide-up hover-lift-enhanced group">
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 my-12 sm:my-16">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover-lift-enhanced group">
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <History className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">{completedActivities.length}</div>
@@ .. @@
           
-          <div className="dual-border-card stats-card-orange text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.1s' }}>
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+          <div className="stats-card-orange-glow text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.1s' }}>
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <Users className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">300+</div>
@@ .. @@
           
-          <div className="dual-border-card stats-card-navy text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.2s' }}>
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.2s' }}>
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <Trophy className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">18</div>
@@ .. @@
           
-          <div className="dual-border-card stats-card-navy text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.3s' }}>
-            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
+          <div className="stats-card-navy-glow text-center animate-slide-up hover-lift-enhanced group" style={{ animationDelay: '0.3s' }}>
+            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 icon-glow-white">
               <Camera className="h-6 w-6 text-white" />
             </div>
             <div className="text-2xl sm:text-3xl font-bold mb-2">{totalPhotos}</div>
@@ .. @@

         {/* Success Stories */}
-        <div className="mt-16 sm:mt-20 dual-border-card stats-card-navy rounded-3xl p-8 sm:p-12 text-white shadow-elevated animate-slide-up mx-2 sm:mx-0 hover-lift-enhanced">
+        <div className="mt-16 sm:mt-20 stats-card-navy-enhanced rounded-3xl p-8 sm:p-12 text-white shadow-elevated animate-slide-up mx-2 sm:mx-0 hover-lift-enhanced relative overflow-hidden">
+          {/* Internal glow effects */}
+          <div className="absolute top-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
+          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
+          
           <div className="relative inline-block mb-8">
             <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg"></div>
-            <div className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
+            <div className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto icon-glow-white">
               <Sparkles className="h-10 w-10 text-white" />
             </div>
           </div>
-          <div className="text-center mb-8">
-            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Success Stories</h2>
-            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
+          <div className="text-center mb-8 relative z-10">
+            <h2 className="text-2xl sm:text-3xl font-bold mb-6 stats-title-glow">Success Stories</h2>
+            <p className="text-white/95 text-lg max-w-2xl mx-auto leading-relaxed">
               Our previous activities have been stepping stones for many students' career growth
             </p>
           </div>
           
-          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
-            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-soft hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
+          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
+            <div className="success-story-card rounded-2xl p-8 transition-all duration-300 hover:scale-105">
               <div className="text-5xl mb-6 text-center">💡</div>
               <h3 className="font-bold text-white mb-4 text-lg text-center">Innovation Boost</h3>
-              <p className="text-white/90 text-sm leading-relaxed text-center">
+              <p className="text-white/95 text-sm leading-relaxed text-center">
                 Students developed 15+ innovative projects through our hackathons and competitions
               </p>
             </div>
             
-            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-soft hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
+            <div className="success-story-card rounded-2xl p-8 transition-all duration-300 hover:scale-105">
               <div className="text-5xl mb-6 text-center">🚀</div>
               <h3 className="font-bold text-white mb-4 text-lg text-center">Career Growth</h3>
-              <p className="text-white/90 text-sm leading-relaxed text-center">
+              <p className="text-white/95 text-sm leading-relaxed text-center">
                 Many participants received internship offers and job placements after showcasing their skills
               </p>
             </div>
             
-            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-soft hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
+            <div className="success-story-card rounded-2xl p-8 transition-all duration-300 hover:scale-105">
               <div className="text-5xl mb-6 text-center">🤝</div>
               <h3 className="font-bold text-white mb-4 text-lg text-center">Network Building</h3>
-              <p className="text-white/90 text-sm leading-relaxed text-center">
+              <p className="text-white/95 text-sm leading-relaxed text-center">
                 Strong connections formed between students, faculty, and industry professionals
               </p>
             </div>
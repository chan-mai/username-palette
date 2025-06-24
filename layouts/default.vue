<template>
    <slot />
    <footer class="bg-slate-900 text-white py-8 mt-auto">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- このサイトについて -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">このサイトについて</h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        インスタやTikTokなどのSNSで使える、いい感じのエモくて読めないユーザーネームが作れます。
                    </p>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        <NuxtLink to="https://username-maker.com/" target="_blank"
                            class="text-white hover:text-rose-200 transition-colors">読めないユーザーネームメーカー</NuxtLink>
                        のインスパイアを受けています。
                    </p>
                </div>

                <!-- 運営者情報 -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">免責事項</h3>
                    <div class="text-gray-300 text-sm space-y-2">
                        <p>このサイトでは、アクセス解析のため、Google Analyticsを使用しています。</p>
                        <p>データは個人と紐付かない形で収集されており、個人を特定するものではありません。</p>
                    </div>
                </div>

                <!-- リンク・その他 -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">リンク</h3>
                    <ul class="text-gray-300 text-sm space-y-2">
                        <li><NuxtLink to="https://mq1.dev/about" class="text-white hover:text-rose-200 transition-colors">運営者情報</NuxtLink></li>
                    </ul>
                </div>
            </div>

            <!-- コピーライト -->
            <div class="border-t border-gray-700 mt-8 pt-6 text-center">
                <p class="text-gray-400 text-sm">
                    © 2025 chan-mai. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>
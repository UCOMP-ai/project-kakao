import Link from 'next/link';

export function UcompFooter() {
    return (
        <footer className="border-t border-border bg-card/30 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 브랜드 */}
                    <div className="md:col-span-1">
                        <div className="mb-3">
                            <span className="text-sm font-semibold text-foreground">유컴패니온</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            지금 유컴패니온그룹과 함께 시작하세요.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <Link
                                href="https://www.youtube.com/@ucompanion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                YouTube
                            </Link>
                            <Link
                                href="https://blog.naver.com/u_comp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                블로그
                            </Link>
                            <Link
                                href="https://datamuseum.tistory.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                티스토리
                            </Link>
                        </div>
                    </div>

                    {/* 도구모음 */}
                    <div>
                        <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">도구모음</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://www.ucomp.co.kr/request"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    프로젝트 문의
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.ucomp.co.kr/_common/new_download_file.php?menu=brochure&file_no=93"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Download IR
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 기업정보 */}
                    <div className="md:col-span-2">
                        <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">기업정보</h3>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                            <li>
                                <span className="text-foreground/60">사업자번호</span>
                                <span className="ml-2">211-88-79196</span>
                            </li>
                            <li>
                                <span className="text-foreground/60">대표자</span>
                                <span className="ml-2">한수진</span>
                            </li>
                            <li>
                                <span className="text-foreground/60">T.</span>
                                <span className="ml-2">070-5030-5830</span>
                                <span className="mx-2 text-foreground/30">|</span>
                                <span className="text-foreground/60">F.</span>
                                <span className="ml-2">070-7545-1710</span>
                            </li>
                            <li>
                                <span className="text-foreground/60">E.</span>
                                <Link
                                    href="mailto:ucomp_contact@ucomp.co.kr"
                                    className="ml-2 hover:text-foreground transition-colors"
                                >
                                    ucomp_contact@ucomp.co.kr
                                </Link>
                            </li>
                            <li>
                                <span className="text-foreground/60">ADDRESS.</span>
                                <span className="ml-2">서울시 강남구 봉은사로 50길 29 유컴패니온그룹</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 카피라이트 */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        COPYRIGHT © U : COMPANION. ALL RIGHT RESERVED
                    </p>
                    <Link
                        href="https://www.ucomp.co.kr/contact#rejectEmail"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        이메일무단수집거부
                    </Link>
                </div>
            </div>
        </footer>
    );
}
